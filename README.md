# netplan.io
[![CircleCI build status](https://circleci.com/gh/canonical-web-and-design/netplan.io.svg?style=shield)](https://circleci.com/gh/canonical-web-and-design/netplan.io) [![Code coverage](https://codecov.io/gh/canonical-web-and-design/netplan.io/branch/main/graph/badge.svg)](https://codecov.io/gh/canonical-web-and-design/netplan.io)

This is the repo for the Netplan site

## Local development

### Using Task (Recommended)

The recommended way to run the site locally uses [Task](https://taskfile.dev/) for dependency management and task automation.

**Prerequisites:**
- [Task](https://taskfile.dev/installation/) installed
- [mise](https://mise.jup.re/getting-started.html) installed (for managing Python and Node versions)
- Python 3.10+ and Node.js 20+ (mise will install these automatically)

**Setup and run:**

```bash
# Install dependencies (Python packages and Node modules)
task install

# Start the development server with watch mode
task start
```

This will build the CSS/JS and start the Flask server at http://127.0.0.1:8024. Changes to Sass/JS files will automatically rebuild.

**Useful tasks:**
- `task build` - Build CSS and JavaScript assets
- `task watch` - Watch for file changes and rebuild assets (run in separate terminal)
- `task serve` - Run the Flask server only
- `task test` - Run all tests
- `task lint` - Run linters (Python, JS, SCSS)
- `task format` - Format Python code
- `task clean` - Remove build artifacts and dependencies
- `task clean-all` - Complete environment reset

### Using Docker (Alternative)

For Docker-based development, use the `./run` script:

```bash
./run
```

Once the containers are setup, you can visit <http://127.0.0.1:8024> in your browser.

To watch for changes and rebuild CSS:

```bash
./run watch
```

# Deploy
You can find the deployment config in the deploy folder.
