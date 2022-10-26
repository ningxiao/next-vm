import useSWR from 'swr';
import type { NextPage } from 'next';
import LoginControl from '../components/LoginControl';
import { Button } from '@arco-design/web-react';
import { UserVo } from './api/getVm';
const Welcome = ({ name }: { name?: string | number }) => {
    if (name) {
        return (
            <Button type="primary" className="mr-2">
                {name}
            </Button>
        );
    }
    return null;
};
const ListItem = (props: any) => {
    return <li>{props.value}</li>;
};
const NumberList = (props: any) => {
    const numbers = props.numbers;
    const listItems = numbers.map((vo: number) => (
        <ListItem key={vo.toString()} value={vo} />
    ));
    return <ul>{listItems}</ul>;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const About: NextPage = () => {
    const numbers = [1, 2, 3, 4, 5];
    const { data, error } = useSWR<UserVo>('/api/getVm', fetcher);
    if (error) return <div>Failed to load users</div>;
    if (!data) return <div>加载中</div>;
    return (
        <section>
            <div>
                <Welcome name={data.name} />
                <Welcome name={data.email} />
                <Welcome name={data.job} />
                <Welcome name={data.now} />
                <LoginControl />
                <NumberList numbers={numbers} />
            </div>
        </section>
    );
};
export default About;
