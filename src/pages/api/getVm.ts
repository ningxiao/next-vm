// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import vm from 'vm';
import sqlite3 from 'sqlite3';
import { guid } from '../../utils';
import type { NextApiRequest, NextApiResponse } from 'next';
export interface UserVo {
    id: number;
    name: string;
    login: string;
    email: string;
    job?: string;
    now: number;
}
const code = `
    ((data) => {
        data.guid = guid();
        data.job = '程序员';
        if (data.id === 2163811) {
            data.job = '富二代';
        }
        data.now = Date.now();
        return data;
    })(dataSource)
`;
const sqlite = sqlite3.verbose();
const vmScript = new vm.Script(code);
const body = {
    id: 2163811,
    login: 'liergou',
    email: 'liergou@test.com',
    name: '李二狗',
    now: Date.now(),
};
// db.serialize(() => {
//     // db.run("CREATE TABLE lorem (info TEXT)");
//     // const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//     // for (let i = 0; i < 10; i++) {
//     //     stmt.run("Ipsum " + i);
//     // }
//     // stmt.finalize();
//     // db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
//     //     console.log(row.id + ": " + row.info);
//     // });
// });
// db.close();
export default function getUserInfo(
    req: NextApiRequest,
    res: NextApiResponse<UserVo>
) {
    if (req.method === 'GET') {
        try {
            const db = new sqlite.Database('nextvm.db');
            const context = { guid, dataSource: body };
            vmScript.runInNewContext(context);
            db.serialize(() => {
                db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
                    console.log(row.id + ': ' + row.info);
                });
            });
            db.close();
            res.status(200).json(context.dataSource);
        } catch (err) {
            console.error('Failed to compile script.', err);
        }
    }
}
