import { Button, Form, Input, Spin, TreeSelect, message } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
	useSectors,
	useTask,
	useUpdateTask,
} from '../../../services/api-quries';

import moment from 'moment';
import { storage } from '../../../utils';
import { useState } from 'react';

const TaskDetails = () => {
	const navigate = useNavigate();
	const [appLoading, setAppLoading] = useState(false);
	let { id } = useParams();
	const [form] = Form.useForm();
	const sectorsQuery: any = useSectors({
		options: {
			page: 1,
			take: 100,
		},
	});
	const updateTaskMutation = useUpdateTask({
		config: {
			onSuccess: (data) => {
				message.success('Task Updated Successfully');
				navigate('/');
			},
		},
	});
	const onFinish = (values: any) => {
		updateTaskMutation.mutate({
			id: id || '',
			payload: {
				name: values.name,
				sectors: values.select,
				userId: storage.getDecodedToken()?.id,
			},
		});
	};
	const taskQuery: any = useTask({
		id: id || '',
		config: {
			enabled: id ? true : false,
			onSuccess: (data) => {
				form.setFieldsValue({
					name: data?.data?.payload?.title,
					select: data?.data?.payload?.taskSectors?.map(
						(item: any) => item?.sector?.id
					),
				});
				setValue(
					data?.data?.payload?.taskSectors?.map((item: any) => item?.sector?.id)
				);
				setTimeout(() => {
					setAppLoading(false);
				}, 500);
			},
		},
	});
	const [value, setValue] = useState<any>([]);
	return appLoading || taskQuery.isLoading || sectorsQuery.isLoading ? (
		<div className='h-screen w-screen flex justify-center items-center'>
			<Spin />
		</div>
	) : (
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
				<div className='mb-16 flex justify-between items-center'>
					<div className='flex-1'>
						<h3 className='title'>
							Title: <b>{taskQuery.data?.data?.payload?.title}</b>
						</h3>
						<p className='content'>
							{moment(taskQuery.data?.data?.payload?.createdAt).fromNow()}
						</p>
					</div>
				</div>
				<Form
					form={form}
					name='basic'
					style={{ maxWidth: 600, width: '100%' }}
					initialValues={{ sectors: [], name: '' }}
					onFinish={onFinish}
					layout='vertical'
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
						rules={[{ required: true, message: 'Please select your sectors!' }]}
					>
						<TreeSelect
							loading={sectorsQuery.isLoading || taskQuery.isLoading}
							value={value}
							showSearch
							style={{ width: '100%' }}
							dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
							placeholder='Please select'
							allowClear
							multiple
							treeDefaultExpandAll
							treeData={sectorsQuery?.data?.data?.payload}
							defaultValue={taskQuery?.data?.data?.payload?.taskSectors?.map(
								(item: any) => item?.sector?.id
							)}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							loading={updateTaskMutation.isLoading}
							type='primary'
							htmlType='submit'
						>
							Update
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};
export default TaskDetails;
