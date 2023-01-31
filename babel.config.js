module.exports = (api) => {
    api.cache(false);
    return {
        presets: [
            [
                'react-app',
                {
                    absoluteRuntime: false,
                },
            ],
        ],
    };
};
