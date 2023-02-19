import { Button, Card, Checkbox, Form, Input, Space, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { IMAGES } from '../../../assets/index';
import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
	const { registerFn } = useAuth();
	const onFinish = (values: any) => {
		registerFn.mutate(values);
	};
	return (
		<div
			className='auth-page'
			style={{
				minHeight: '100vh',
				minWidth: '100vw',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: `url(${IMAGES.LightBd})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center right',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<Card
				style={{
					maxWidth: '500px',
					width: '100%',
					boxShadow: '0 0 20px #0815420d',
					borderRadius: 10,
				}}
			>
				<img
					style={{ maxWidth: 180, margin: '20px auto', display: 'block' }}
					src={IMAGES.Logo}
					alt=''
				/>
				<Typography.Title
					level={2}
					style={{ textAlign: 'center', marginBottom: 30 }}
				>
					Register
				</Typography.Title>
				<Form
					name='normal_Register'
					className='Register-form'
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<Form.Item
						name='email'
						rules={[
							{ required: true, message: 'Please input your email!' },
							{ type: 'email', message: 'Invalid Email' },
						]}
					>
						<Input
							type='email'
							size='large'
							prefix={<UserOutlined className='site-form-item-icon' />}
							placeholder='email'
						/>
					</Form.Item>
					<Form.Item
						name='password'
						rules={[{ required: true, message: 'Please input your Password!' }]}
					>
						<Input
							size='large'
							prefix={<LockOutlined className='site-form-item-icon' />}
							type='password'
							placeholder='Password'
						/>
					</Form.Item>
					<Form.Item>
						<Space style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Form.Item name='remember' valuePropName='checked' noStyle>
								<Checkbox>Remember me</Checkbox>
							</Form.Item>
							{/* <a href="/">Forgot password</a> */}
						</Space>
					</Form.Item>
					<Form.Item>
						<Button
							loading={registerFn.isLoading}
							size='large'
							style={{ display: 'block', width: '100%' }}
							type='primary'
							htmlType='submit'
						>
							Sign Up
						</Button>
					</Form.Item>
					<h4 className='flex justify-center py-2 px-2'>
						Already have an account ?{' '}
						<Link to='/auth/login' className='text-primary ml-2'>
							Login
						</Link>
					</h4>
				</Form>
			</Card>
		</div>
	);
};

export default Register;
