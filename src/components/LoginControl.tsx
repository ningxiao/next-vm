import React, { useState, useEffect } from 'react';
import Avatar from './avatar';
const UserGreeting = (props: any) => {
    return <h1>Welcome back!</h1>;
};
const GuestGreeting = (props: any) => {
    return <h1>Please sign up.</h1>;
};
const LoginButton = (props: any) => {
    return <button onClick={props.onClick}>Login</button>;
};
const LogoutButton = (props: any) => {
    return <button onClick={props.onClick}>Logout</button>;
};
const Greeting = (props: any) => {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
};
const Example = () => {
    // 声明一个新的叫做 “count” 的 state 变量
    const [count, setCount] = useState(0);
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
};
export default class LoginControl extends React.Component {
    state: {
        isLoggedIn: boolean;
    };
    constructor(props: any) {
        super(props);
        this.state = { isLoggedIn: false };
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }
    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }
        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
                <Example />
                <Avatar name="宁肖" url="/vercel.svg" />
            </div>
        );
    }
}
