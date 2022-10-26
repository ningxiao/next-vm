import style from './style/index.module.css';
import useSWR from 'swr';
import { NextPage } from 'next';
import { useState, Fragment } from 'react';
import { IconStar } from '@arco-design/web-react/icon';
import { UserInfoVo, ResponseUserVo } from '../api/getUserInfo';
import {
    Tag,
    Spin,
    Table,
    Modal,
    Space,
    Button,
    Typography,
} from '@arco-design/web-react';
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Workplace: NextPage = () => {
    const [info, setInfo] = useState({} as UserInfoVo);
    const [visible, setVisible] = useState(false);
    const { data, error } = useSWR<ResponseUserVo>('/api/getUserInfo', fetcher);
    const userInfo = data?.data;
    const userInfoError = data?.error;
    if (error || !userInfo) return <div>{userInfoError?.msg}</div>;
    if (!data) return <Spin className={style.spin} />;
    const border = { cell: true, wrapper: true };
    const { columns, rows } = userInfo;
    const columnSize = columns.length;
    const concatColumns = columns.concat({
        title: 'Operation',
        dataIndex: 'operation',
        fixed: 'right',
        width: 100,
        render: (col: any, item: any, index: number) => (
            <Button
                type="primary"
                size="mini"
                onClick={() => {
                    setInfo(item);
                    setVisible(true);
                }}
            >
                Confirm
            </Button>
        ),
    });
    const createSummary = (currentData: UserInfoVo[] = []) => (
        <Table.Summary>
            <Table.Summary.Row>
                <Table.Summary.Cell>Total</Table.Summary.Cell>
                <Table.Summary.Cell />
                <Table.Summary.Cell>
                    <Typography.Text type="error">
                        {currentData.reduce(
                            (prev: number, next: UserInfoVo) => prev + next.salary,
                            0
                        )}
                    </Typography.Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                    {currentData.reduce(
                        (prev: number, next: UserInfoVo) => prev + next.count,
                        0
                    )}
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                    {currentData.reduce(
                        (prev: number, next: UserInfoVo) => prev + next.stars,
                        0
                    )}
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                    {currentData.reduce(
                        (prev: number, next: UserInfoVo) => prev + next.ang,
                        0
                    )}
                </Table.Summary.Cell>
                <Table.Summary.Cell />
            </Table.Summary.Row>
            <Table.Summary.Row>
                <Table.Summary.Cell>Avarage</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={columnSize - 1}>
                    <Typography.Text type="success">
                        {currentData.reduce(
                            (prev: any, next: UserInfoVo) => prev + next.salary,
                            0
                        ) / currentData.length}
                    </Typography.Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell />
            </Table.Summary.Row>
        </Table.Summary>
    );
    const TagList = (props: { data: UserInfoVo }) => {
        const { data } = props;
        return (
            <Space size="large">
                <Tag icon={<IconStar />} closable>
                    {data.name}
                </Tag>
                <Tag icon={<IconStar />} closable>
                    {data.salary}
                </Tag>
                <Tag icon={<IconStar />} closable>
                    {data.ang}
                </Tag>
            </Space>
        );
    };
    return (
        <Fragment>
            <Table
                rowKey="id"
                data={rows}
                columns={concatColumns}
                summary={createSummary}
                border={border}
                scroll={{ x: 1200 }}
            />
            <Modal
                title="Modal Title"
                visible={visible}
                unmountOnExit={true}
                autoFocus={false}
                focusLock={true}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
            >
                <TagList data={info}></TagList>
            </Modal>
        </Fragment>
    );
};
export default Workplace;
