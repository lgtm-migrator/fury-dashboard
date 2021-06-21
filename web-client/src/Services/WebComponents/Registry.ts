export class Registry {
 public static readonly singleton: Registry = new Registry();
 public static readonly ComponentTagList = {
  FurySupport: 'fury-support',
  FurySubNav: 'fury-subnav',
  FuryHeader: 'fury-header'
 }

 constructor() {}

 public add(componentTag: string, componentModule: any) {
  window.customElements.define(componentTag, componentModule);
 }

 public remove(componentTag: string) {
  // TODO: at the moment there's no cleanup function on webcomponents to remove/replace them after being defined
  // https://github.com/WICG/webcomponents/issues/754
 }
}