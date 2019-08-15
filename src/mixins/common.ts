import { Vue, Component } from 'vue-property-decorator'
@Component
export class Common extends Vue {
  test2() {
    console.log('this is Common');
  }
}
