module.exports = {
    apps: [
        {
            name: "love_bhs",
            script: "dist/index.js",
            watch: true,
            ignore_watch: [
                // 从监控目录中排除
                "node_modules",
                "logs",
                "public",
                "static"
            ],
            instances: 1,
            exec_mode: 'cluster',
            max_memory_restart: '300M'
        }
    ]
};
