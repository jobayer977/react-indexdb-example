import { Avatar, Space } from 'antd';
import { Button, Checkbox, Form, Input, Select, TreeSelect } from 'antd';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';

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
const TaskDetails = () => {
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
						Go Back to{' '}
						<Link className='text-primary' to='/'>
							Dashboard
						</Link>
					</h4>
				</div>

				<div className='mb-16'>
					<h3 className='title'>Developer Tools Support</h3>
					<p className='content'>
						Expose custom views and modifiers in the Xcode library.
					</p>
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
							Update
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default TaskDetails;
