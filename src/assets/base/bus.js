import Vue from 'vue'

// 使用 Event Bus
const bus = new Vue({

    methods: {

        warningMessage(str) {
            this.$message.warning({
                showClose: true,
                message: str
            })
        },

        successMessage(str) {
            this.$message.success({
                showClose: true,
                message: str
            })
        },

        errorMessage(str) {
            this.$message.error({
                showClose: true,
                message: str
            })
        },
        loading(target) {
            let loading = this.$loading({
                lock: true,
                text: '正在获取数据...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
                // target:target,
            })
            return loading
        },



        /**
         * 全局通知
         * @param str
         * @param type  可选值： warning | success | error |info
         */
        notify(str, type = 'success') {
            this.$notify({
                title: '',
                message: str,
                type: type
            });
        },

    }
});

export default bus;
