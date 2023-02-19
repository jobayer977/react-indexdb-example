import './styles.scss';

import { Button, Checkbox, Form, Input, Spin, TreeSelect, message } from 'antd';
import {
	useCreateTask,
	useSectors,
	useTasks,
} from '../../../services/api-quries';

import { ITaskEntity } from '../../../models/response.interfaces';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { storage } from '../../../utils';
import { useAuth } from '../../../features/auth';

const DashboardPage = () => {
	const { logoutFn } = useAuth();
	const createTaskMutation = useCreateTask({
		config: {
			onSuccess: (data) => {
				message.success('Task created');
			},
		},
	});
	const taskQuery: any = useTasks({
		options: {
			page: 1,
			take: 100,
			userId: storage.getDecodedToken()?.id,
		},
	});
	const sectorsQuery: any = useSectors({
		options: {
			page: 1,
			take: 100,
		},
	});
	const onFinish = (values: any) => {
		if (!values.agree) {
			return message.error('Please agree');
		}
		createTaskMutation.mutate({
			name: values.name,
			sectors: values.select,
			userId: storage.getDecodedToken()?.id,
		});
	};
	return (
		<Spin spinning={taskQuery.isLoading || sectorsQuery.isLoading}>
			<div className='container mx-auto py-40'>
				<div className='flex  mx-auto flex-col'>
					<div className='flex pb-10'>
						<h4>You are logged in</h4>
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
						style={{ maxWidth: 600, width: '100%' }}
						initialValues={{ agree: false, sectors: [], name: '' }}
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
							rules={[
								{ required: true, message: 'Please select your sectors!' },
							]}
						>
							<TreeSelect
								showSearch
								style={{ width: '100%' }}
								dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
								placeholder='Please select'
								allowClear
								multiple
								treeDefaultExpandAll
								treeData={sectorsQuery?.data?.data?.payload}
							/>
						</Form.Item>
						<Form.Item
							name='agree'
							valuePropName='checked'
							hasFeedback
							rules={[{ required: true, message: 'Please agree' }]}
						>
							<Checkbox>Agree</Checkbox>
						</Form.Item>
						<Form.Item>
							<Button
								loading={createTaskMutation.isLoading}
								type='primary'
								htmlType='submit'
							>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</div>
				{taskQuery?.data?.data?.payload?.map((task: ITaskEntity) => (
					<Link to={`/dashboard/task/${task?.id}`} className='mt-4 block'>
						<div className='card p-4  rounded-2xl border relative border-solid border-[#d2d2d7] cursor-pointer hover:bg-blue-50 hover:border-primary-500 transition-all duration-300 ease-in-out'>
							<h3 className='title'>{task?.title}</h3>
							<p className='content'>
								{moment(task?.createdAt).format('DD/MM/YYYY')}
							</p>
							<img
								src='/icons/angle-right.svg'
								className='h-5 absolute right-5 top-1/2 -translate-y-1/2'
								alt=''
							/>
						</div>
					</Link>
				))}
			</div>
		</Spin>
	);
};
export default DashboardPage;
