# Zentip website

The public website for [Zentip](https://zentip.org), a Chrome extension that helps Zendesk users monitor ticket activity and receive desktop or webhook notifications.

## Site sections

- Product overview and screenshots
- Pricing and subscription information
- User documentation
- Frequently asked questions
- Support contact form
- Terms of Service, Privacy Policy, and Refund Policy
- Blog

## Development

The site is built with Astro, TypeScript, and Tailwind CSS.

```shell
npm ci
npm run dev
```

The local development server is available at `http://localhost:4321`.

## Validation

```shell
npm run check
npm run build
```

The production output is generated in `dist/`.

## Deployment

GitHub Actions builds this directory and deploys the generated `dist/` directory to GitHub Pages whenever changes are pushed to `main`.

The deployment workflow is located at:

```text
../.github/workflows/deploy.yaml
```

## License

See [LICENSE.md](./LICENSE.md) for license and third-party attribution information.
