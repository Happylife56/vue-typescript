// 公共的方法
import { Message } from 'element-ui'
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export class MixinsIndex extends Vue {
    // 跳转路由
    loadPage(routerName: string, params2?: string) {
        if (params2) {
            this.$router.push({ name: routerName, params: { params2 } })
        } else {
            this.$router.push({
                name: routerName
            })
        }
    }
    // 获取当前的时间
    getNowTime() {
        const nowTime = new Date()
        const year = nowTime.getFullYear()
        const month = this.formatTime(nowTime.getMonth() + 1)
        const day = this.formatTime(nowTime.getDate())
        const hours = this.formatTime(nowTime.getHours())
        const minutes = this.formatTime(nowTime.getMinutes())
        const seconds = this.formatTime(nowTime.getSeconds())
        return (
            year +
            '-' +
            month +
            '-' +
            day +
            ' ' +
            hours +
            ':' +
            minutes +
            ':' +
            seconds
        )
    }
    formatTime(val: number) {
        if (val < 10) {
            return '0' + val
        } else {
            return val
        }
    }
    // 获取当前月
    getNowMonth() {
        const nowTime = new Date()
        const year = nowTime.getFullYear()
        const month = this.formatTime(nowTime.getMonth() + 1)
        return year + '-' + month
    }
    // 获取当前月年月日
    getNowMonthDay() {
        const nowTime = new Date()
        const year = nowTime.getFullYear()
        const month = this.formatTime(nowTime.getMonth() + 1)
        const day = this.formatTime(nowTime.getDate())
        return year + '-' + month + '-' + day
    }
    // 获取当前年份
    getNowYear() {
        const nowTime = new Date()
        const year = nowTime.getFullYear()
        return year
    }
    // 处理计算后小数点后两位
    toFixed2(val: number) {
        if (typeof val !== 'number') { val = Number(val) }
        return Number(val.toFixed(2))
    }
    // 验证表单数据
    matchNumber2(value: string) {
        // 通过正则过滤小数点后两位
        // value = (e.target.value.match(/^\d*(\.?\d{02})/g)[0]) || null
        value = value.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
        value = value.replace(/^\./g, '') // 验证第一个字符是数字而不是.
        value = value.replace(/\.{2}/g, '.') // 只保留第一个. 清除多余的.
        value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
        if (value.indexOf('.') < 0 && value !== '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            if (value.substr(0, 1) === '0' && value.length === 2) {
                value = value.substr(1, value.length)
            }
        }

        if (value !== '') {
            if (value.indexOf('.') > 0) {
                if (value.split('.')[1].length > 2) { // 控制只能输入小数点后2位
                    value = ((value as any).match(/^\d*(\.?\d{02})/g)[0]) || null
                }
            }
        }
        return value
    }
    // 验证正整数
    matchInteger(e: any) {
        e.target.value = (e.target.value.match(/^\d*/g)[0]) || null
    }
    // 消息提示
    messagePoint(text: string, type = 'error') {
        // @ts-ignore
        Message.closeAll() // 关闭所有提示
        const msg = {
            error: () => Message.error(text),
            success: () => Message.success(text),
            warning: () => Message.warning(text),
        }
        // @ts-ignore
        msg[type]();
    }
};
