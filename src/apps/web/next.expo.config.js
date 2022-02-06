const paths = require('@expo/config/paths');
const addons = require('@expo/webpack-config/addons');

// copied from @expo/next-adapter
function withExpo(nextConfig = {}) {
  return {
    ...nextConfig,
    pageExtensions: paths.getBareExtensions(['web']),
    webpack(config, options) {
      const babel = {
        dangerouslyAddModulePathsToTranspile: ['@ui-kitten/components', '@ui-kitten'],
      };

      // Prevent define plugin from overwriting Next.js environment.
      process.env.EXPO_WEBPACK_DEFINE_ENVIRONMENT_AS_KEYS = 'true';
      const webpack5 = (options.config || {}).webpack5;
      const expoConfig = addons.withUnimodules(
        config,
        {
          projectRoot: nextConfig.projectRoot || process.cwd(),
          babel,
        },
        {
          supportsFontLoading: false,
          webpack5: webpack5 !== false,
        }
      );
      // Use original public path
      (expoConfig.output || {}).publicPath = (config.output || {}).publicPath;
      // TODO: Bacon: use commonjs for RNW babel maybe...
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(expoConfig, options);
      }
      return expoConfig;
    },
  };
}

module.exports = { withExpo };
