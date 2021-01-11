import { FC, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

export const Page: FC = ({ children }) => {
    const Styles = createGlobalStyle`
    .page {
      padding: 5px;
      height: 100%;
      display: grid;
      grid-template-rows: 30px 1fr;
      gap: 5px;
      animation: all .5s;
      transition: .5s;
    }
    .app-notification {
      animation: all .5s;
      border-radius: 5px;
      background-color: #141a1f;
      color: #5999c7;
      text-align: center;
      line-height: 30px;
    }
    .app-notification.info: {
      background: #365b82;
    }
    .app-notification.warning: {
      background: #826436;
    }
    .app-notification.danger: {
      background: #823636;
    }
    .app-notification.success: {
      background: #368244;
    }
    .content {
    }
    `;
    const [showNoti, setShowNoti] = useState(true);
    return (
        <>
            <Styles />
            <div
                className="page"
                style={{
                    ...(!showNoti && { gridTemplateRows: '0px 1fr' }),
                }}
            >
                <div className="app-notification info">
                    Testing, testing, 1, 2, 3
                </div>
                <div className="content">{children}</div>
            </div>
        </>
    );
};
