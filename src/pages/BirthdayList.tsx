import {Button, DatePicker, Empty, Flex, Form, Input, Modal} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {useId, useState} from "react";
import {BirthdayItem} from "../components/BirthdayItem.tsx";
import {useAppDispatch, useAppSelector} from "../redux/Store.ts";
import dayjs from 'dayjs';
import {addBirthday} from "../redux/BirthdaySlice.ts";
import 'dayjs/locale/ru';
import {Birthday} from "../dto/Birthday.ts";

const {Item} = Form;

export const BirthdayList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {birthdayList} = useAppSelector(state => state.birthdays);
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    dayjs.locale('ru');
    const id = useId();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        const fullValues: Birthday = {...values, date: dayjs(values.date).format('DD MMMM'), id: values.date};
        dispatch(addBirthday(fullValues));
        form.resetFields();
        handleCancel();
    }


    return (
        <Flex vertical gap='middle' style={{height: '100%'}}>
            <Modal footer={false} centered title="Добавить дату рождения" open={isModalOpen} onCancel={handleCancel}>
                <Form onFinish={onFinish} form={form} layout='vertical' colon={false}>
                    <Flex vertical align='end'>
                        <Item style={{ marginTop: 16, width: '100%'}} name='name'>
                            <Input required placeholder='Виновник торжества' />
                        </Item>
                        <Item style={{ width: '100%'}} name='date'>
                            <DatePicker required format='DD MMMM' style={{width: '100%'}} placeholder='Дата торжества' />
                        </Item>
                        <Item style={{margin: 0}}>
                            <Button type='primary' htmlType='submit'>
                                Добавить
                            </Button>
                        </Item>
                    </Flex>
                </Form>
            </Modal>

            <Flex gap='middle' justify='space-between'>
                <Input size='large' placeholder='Поиск' />
                <Button style={{width: 32, height: 32, padding: 18}} type='primary' onClick={showModal} icon={<PlusOutlined />} />
            </Flex>

            <Flex gap='middle' wrap>
                {birthdayList !== undefined && birthdayList.length > 0 ? birthdayList.map((birthday, i) => <BirthdayItem birthday={birthday} key={birthday.id + i} />) : <Empty style={{margin: "auto"}} description='Что-то как-то пока ничего не добавлено' />}
            </Flex>

        </Flex>
    );
};
