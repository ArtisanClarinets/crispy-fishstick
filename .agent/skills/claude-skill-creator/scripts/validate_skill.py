#!/usr/bin/env python3
"""
Claude Skill Validator

Validates that a Skill meets all requirements and best practices.
"""

import os
import re
import sys
from pathlib import Path
from typing import List, Tuple


class SkillValidator:
    """Validates Claude Skill SKILL.md files"""

    def __init__(self, filepath: str):
        self.filepath = Path(filepath)
        self.errors: List[str] = []
        self.warnings: List[str] = []
        self.content = None
        self.frontmatter = {}

    def validate(self) -> Tuple[bool, str]:
        """Run all validation checks"""

        if not self._check_file_exists():
            return False, f"File not found: {self.filepath}"

        if not self._read_file():
            return False, "Failed to read file"

        if not self._extract_frontmatter():
            return False, "Missing or invalid YAML frontmatter"

        self._validate_name()
        self._validate_description()
        self._validate_content()

        return self._format_results()

    def _check_file_exists(self) -> bool:
        """Check if file exists"""
        return self.filepath.exists()

    def _read_file(self) -> bool:
        """Read file content"""
        try:
            with open(self.filepath, "r", encoding="utf-8") as f:
                self.content = f.read()
            return True
        except Exception as e:
            self.errors.append(f"Cannot read file: {e}")
            return False

    def _extract_frontmatter(self) -> bool:
        """Extract and validate YAML frontmatter"""

        if not self.content.startswith("---"):
            self.errors.append("File must start with --- (YAML frontmatter)")
            return False

        # Find closing ---
        lines = self.content.split("\n")
        try:
            # Skip opening ---
            end_idx = lines[1:].index("---") + 1
        except ValueError:
            self.errors.append("Frontmatter not properly closed (no closing ---)")
            return False

        # Parse frontmatter
        for line in lines[1:end_idx]:
            if ": " in line:
                key, value = line.split(": ", 1)
                self.frontmatter[key.strip()] = value.strip()

        # Check required fields
        if "name" not in self.frontmatter:
            self.errors.append("Missing required field: 'name'")
            return False

        if "description" not in self.frontmatter:
            self.errors.append("Missing required field: 'description'")
            return False

        return True

    def _validate_name(self) -> None:
        """Validate skill name"""

        name = self.frontmatter.get("name", "")

        # Length
        if len(name) > 64:
            self.errors.append(f"Name too long: {len(name)} chars (max 64)")

        if len(name) == 0:
            self.errors.append("Name cannot be empty")

        # Format
        if not re.match(r"^[a-z0-9-]+$", name):
            self.errors.append(
                f"Name contains invalid characters: '{name}'\n"
                "  Must use only lowercase letters, numbers, and hyphens"
            )

        # Reserved words
        if "anthropic" in name or "claude" in name:
            self.errors.append(
                f"Name cannot contain reserved words: 'anthropic' or 'claude'"
            )

        # XML tags
        if "<" in name or ">" in name:
            self.errors.append("Name cannot contain XML tags")

    def _validate_description(self) -> None:
        """Validate skill description"""

        desc = self.frontmatter.get("description", "")

        # Length
        if len(desc) > 1024:
            self.errors.append(f"Description too long: {len(desc)} chars (max 1024)")

        if len(desc) == 0:
            self.errors.append("Description cannot be empty")

        # XML tags
        if "<" in desc or ">" in desc:
            self.errors.append("Description cannot contain XML tags")

        # Best practices
        if "use when" not in desc.lower():
            self.warnings.append(
                "Description should include 'Use when' guidance\n"
                "  Example: '...Use when the user requests...'"
            )

    def _validate_content(self) -> None:
        """Validate file content after frontmatter"""

        # Find body content (after closing ---)
        lines = self.content.split("\n")
        try:
            body_start = lines.index("---", 1) + 1
        except ValueError:
            self.errors.append("Cannot find end of frontmatter")
            return

        body = "\n".join(lines[body_start:]).strip()

        if not body:
            self.warnings.append("File body is empty or only whitespace")
            return

        # Check for headings
        if not re.search(r"^# ", body, re.MULTILINE):
            self.warnings.append(
                "Body should start with a heading (# Title)\n"
                "  This helps organize the Skill"
            )

        # Check for examples
        if "## Example" not in body and "## example" not in body.lower():
            self.warnings.append(
                "Should include ## Examples section\n"
                "  Include 3+ working code examples for clarity"
            )

        # Check for code blocks
        if "```" not in body:
            self.warnings.append(
                "Should include code blocks (``` ... ```)\n"
                "  Code examples help users understand usage"
            )

        # Size check
        lines_count = len(body.split("\n"))
        if lines_count < 10:
            self.warnings.append(
                f"Content seems very short ({lines_count} lines)\n"
                "  Consider adding more detailed instructions"
            )

    def _format_results(self) -> Tuple[bool, str]:
        """Format validation results"""

        output = []
        passed = len(self.errors) == 0

        # Status
        if passed:
            output.append("✅ SKILL VALIDATION PASSED\n")
        else:
            output.append("❌ SKILL VALIDATION FAILED\n")

        # Metadata summary
        output.append("Metadata:")
        output.append(f"  Name: {self.frontmatter.get('name', 'N/A')}")
        output.append(
            f"  Description length: {len(self.frontmatter.get('description', ''))} chars\n"
        )

        # Errors
        if self.errors:
            output.append(f"❌ Errors ({len(self.errors)}):")
            for i, error in enumerate(self.errors, 1):
                output.append(f"  {i}. {error}")
            output.append("")

        # Warnings
        if self.warnings:
            output.append(f"⚠️  Warnings ({len(self.warnings)}):")
            for i, warning in enumerate(self.warnings, 1):
                output.append(f"  {i}. {warning}")
            output.append("")

        # Recommendations
        if not passed:
            output.append("Recommendations:")
            output.append("  1. Fix all errors before publishing")
            output.append("  2. Consider addressing warnings for quality")
            output.append("  3. Review BEST_PRACTICES.md for detailed guidance")
        else:
            output.append("Great! Consider reviewing the warnings to improve quality.")

        return passed, "\n".join(output)


def main():
    """Main entry point"""

    if len(sys.argv) < 2:
        print("Usage: python validate_skill.py <path_to_skill_file>")
        print("\nExample: python validate_skill.py skills/my-skill/SKILL.md")
        sys.exit(1)

    filepath = sys.argv[1]

    validator = SkillValidator(filepath)
    passed, results = validator.validate()

    print(results)

    sys.exit(0 if passed else 1)


if __name__ == "__main__":
    main()
