declare module 'react-to-webcomponent' {

	import React from 'react';

	export default function reactToWebComponent(component: (props: any) => JSX.Element, react: React, reactDom: any);
}
