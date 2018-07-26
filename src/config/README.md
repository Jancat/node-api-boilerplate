There are several different deployment environments(development, qa, staging, production, etc.). Every environment might has common and respective variables(configs).

Common configs are stored in `default.yaml` and can be overried by other config files. Environment respective cofigs are stored in `{env}.yaml` and overwrite default configs.

Access the configs in App using `Config.get()` and `Config.has()` by exporting `Config` object.