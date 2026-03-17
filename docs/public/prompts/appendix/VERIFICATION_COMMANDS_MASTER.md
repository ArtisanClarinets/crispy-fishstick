# Master Verification Commands

Use command evidence in every phase output.

## Docs and alignment

```bash
python docs/validate_alignment.py .
```

## Web app quality

```bash
npm run lint --workspace web
npm run check-types --workspace web
npm run build --workspace web
```

## Optional web test command

```bash
npm run test --workspace web
```

## Optional post-deploy checks

```bash
curl -I https://<public-domain>/
curl -I https://<public-domain>/services
curl -I https://<public-domain>/pricing
curl -I https://<public-domain>/proof
curl -I https://<public-domain>/contact
curl -I https://<public-domain>/start-audit
curl -I https://<public-domain>/sitemap.xml
curl -I https://<public-domain>/robots.txt
```
