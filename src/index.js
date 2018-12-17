import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from "react-redux";
import { store,history } from "./Store/store";
import router from "./router/router";
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

const ISDEBU=true
ISDEBU || (()=>{
    window.console={
        info: () => {},
        log: () => {},
        warn: () => {},
        debug: () => {},
        error: () => {},
    };
})()

window.onclick=(_,event) => {

}

document.body.oncopy = (event)=>{
        
    event.preventDefault(); // 取消默认的复制事件 
    let textFont, copyFont = window.getSelection(0).toString(); // 被复制的文字 等下插入
    // 防知乎掘金 复制一两个字则不添加版权信息 超过一定长度的文字 就添加版权信息
    textFont = copyFont + '\n'
            + '作者：赵日阳\n'
            + '著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。';
    
    if (event.clipboardData) {
        return event.clipboardData.setData('text', textFont); // 将信息写入粘贴板
    } else {
        // 兼容IE
        return window.clipboardData.setData("text", textFont);
    }
}

ReactDOM.render(
    <Provider store={store}>
    <ConnectedRouter history={history}> 
      <LocaleProvider locale={zh_CN}>
        {router}
      </LocaleProvider>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
