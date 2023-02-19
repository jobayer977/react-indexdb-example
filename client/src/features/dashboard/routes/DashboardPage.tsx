import './styles.scss';

import { Button, Checkbox, Form, Input, Select, TreeSelect } from 'antd';

import { Link } from 'react-router-dom';
import { useAuth } from '../../../features/auth';
import { useState } from 'react';

const { Option } = Select;
const treeData = [
	{
		value: 'parent 1',
		title: 'parent 1',
		children: [
			{
				value: 'parent 1-0',
				title: 'parent 1-0',
				children: [
					{
						value: 'leaf1',
						title: 'my leaf',
					},
					{
						value: 'leaf2',
						title: 'your leaf',
					},
				],
			},
			{
				value: 'parent 1-1',
				title: 'parent 1-1',
				children: [
					{
						value: 'sss',
						title: <b style={{ color: '#08c' }}>sss</b>,
					},
				],
			},
		],
	},
];
const DashboardPage = () => {
	const { logoutFn } = useAuth();
	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const [value, setValue] = useState<string>();

	const onChange = (newValue: string) => {
		console.log(newValue);
		setValue(newValue);
	};
	return (
		<div className='container mx-auto py-40'>
			<div className='flex  mx-auto flex-col'>
				<div className='flex pb-10'>
					<h4>
						You are logged in as <b>Jon Doe</b>
					</h4>
					<button
						className='text-red-500 ml-1 cursor-pointer'
						onClick={() => {
							logoutFn();
						}}
					>
						Logout
					</button>
				</div>
				<Form
					name='basic'
					style={{ width: 600 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					layout='vertical'
					onFinishFailed={onFinishFailed}
					autoComplete='off'
				>
					<Form.Item
						label='Name'
						name='name'
						rules={[{ required: true, message: 'Please input your Name!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						name='select'
						label='Select'
						hasFeedback
						rules={[{ required: true, message: 'Please select your country!' }]}
					>
						<TreeSelect
							showSearch
							style={{ width: '100%' }}
							value={value}
							dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
							placeholder='Please select'
							allowClear
							multiple
							treeDefaultExpandAll
							onChange={onChange}
							treeData={treeData}
						/>
					</Form.Item>

					<Form.Item name='remember' valuePropName='checked'>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>

			<Link to='/dashboard/task/1'>
				<div className='card p-4 rounded-2xl border relative border-solid border-[#d2d2d7] cursor-pointer hover:bg-blue-50 hover:border-primary-500 transition-all duration-300 ease-in-out'>
					<h3 className='title'>Developer Tools Support</h3>
					<p className='content'>
						Expose custom views and modifiers in the Xcode library.
					</p>
					<img
						src='/icons/angle-right.svg'
						className='h-5 absolute right-5 top-1/2 -translate-y-1/2'
						alt=''
					/>
				</div>
			</Link>
		</div>
	);
};

export default DashboardPage;
