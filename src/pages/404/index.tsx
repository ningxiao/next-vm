import styles from './style/index.module.css';
import { NextPage } from 'next';
import { Result, Button } from '@arco-design/web-react';
const Custom404: NextPage = () => {
    return (
        <div className={styles.wrapper}>
            <Result
                className={styles.result}
                status="404"
                subTitle="抱歉，页面不见了～"
                extra={[
                    <Button key="again" style={{ marginRight: 16 }}>重试</Button>,
                    <Button key="back" type="primary">返回</Button>,
                ]}
            />
        </div>
    );
}
export default Custom404;
