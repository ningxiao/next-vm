// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import vm from 'vm';
import sqlite3 from 'sqlite3';
import { guid } from '../../utils';
import { USER, DATA_BASE_NAME } from '../../config/sql';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ColumnProps } from '@arco-design/web-react/lib/Table';
type TableVo = {
    rows: UserInfoVo[];
    columns: ColumnProps[];
}
const sqlite = sqlite3.verbose();
const columns: ColumnProps[] = [
    {
        title: 'Id',
        dataIndex: 'id',
        fixed: 'left',
        width: 200,
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Salary',
        dataIndex: 'salary',
    },
    {
        title: 'Count',
        dataIndex: 'count',
    },
    {
        title: 'Stars',
        dataIndex: 'stars',
    },
    {
        title: 'Ang',
        dataIndex: 'ang',
    },
];
const code = `
    ((data) => {
        data.forEach(vo=>{
            vo.id = guid(vo.id);
            vo.job = '程序员';
            vo.now = Date.now();
        });
        return data;
    })(rows);
`;
const vmScript = new vm.Script(code);
export interface UserInfoVo {
    id: number;
    key: string;
    name: string;
    salary: number;
    count: number;
    stars: number;
    ang: number;
}
export interface ResponseUserVo {
    data: TableVo | null;
    error: null | {
        msg: string;
        code?: number;
        domain?: null | string;
    };
}
export default async function getUserInfo(
    req: NextApiRequest,
    res: NextApiResponse<ResponseUserVo>
) {
    const body: ResponseUserVo = { data: null, error: null };
    try {
        const rows = await new Promise<UserInfoVo[]>((resolve, reject) => {
            const db = new sqlite.Database(DATA_BASE_NAME);
            db.serialize(() => {
                db.all(USER.SELECT_USER_INFO, (err: Error, rows: any[]) => {
                    db.close();
                    if (err) {
                        return reject(err);
                    }
                    return resolve(rows);
                });
            });
        });
        vmScript.runInNewContext({ rows, guid });
        body.data = { rows, columns };
    } catch (err: any) {
        body.error = {
            msg: err.message
        }
    }
    res.status(200).json(body);
}
