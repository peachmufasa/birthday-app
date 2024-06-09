import {Button, Card, Empty, Flex, Form, Input, Space} from "antd";
import { CloseOutlined } from '@ant-design/icons';
import {useId} from "react";
import {useAppDispatch, useAppSelector} from "../redux/Store.ts";
import {addPresent} from "../redux/PresentSlice.ts";
import {Present} from "../dto/Present.ts";
import {PresentItem} from "../components/PresentItem.tsx";

export const PresentList = () => {
    const {presentList} = useAppSelector(state => state.presents);
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const id = useId();

    const handleFinish = (values) => {
        const uniqueId = Date.now();
        const formattedValues = values.items.map((item, i) => ({
            id: uniqueId + i,
            name: item.name,
            items: item.list ? item.list.map(subItem => subItem.present) : []
        }));

        formattedValues.forEach((present: Present) => {
            dispatch(addPresent(present));
        });

        form.resetFields();
    };

    return (
        <Flex vertical gap='middle' style={{height: '100%'}}>
            <Form
                onFinish={handleFinish}
                form={form}
                name="present-list"
                autoComplete="off"
                initialValues={{ items: [{}] }}
            >
                <Form.List name="items">
                    {(fields => (
                        <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                            {fields.map((field) => (
                                <Card
                                    size="small"
                                    key={field.key}
                                >
                                    <Form.Item style={{marginTop: 16}} label="Виновник торжества" name={[field.name, 'name']}>
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label="Список подарков">
                                        <Form.List name={[field.name, 'list']}>
                                            {(subFields, subOpt) => (
                                                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                                    {subFields.map((subField) => (
                                                        <Space key={subField.key}>
                                                            <Form.Item noStyle name={[subField.name, 'present']}>
                                                                <Input placeholder="Было бы классно это подарить" />
                                                            </Form.Item>
                                                            <CloseOutlined
                                                                onClick={() => {
                                                                    subOpt.remove(subField.name);
                                                                }}
                                                            />
                                                        </Space>
                                                    ))}
                                                    <Button type="dashed" onClick={() => subOpt.add()} block>
                                                        + Идея для подарка
                                                    </Button>
                                                </div>
                                            )}
                                        </Form.List>
                                    </Form.Item>
                                </Card>
                            ))}
                        </div>
                    ))}
                </Form.List>
                <Form.Item style={{marginTop: 32}}>
                    <Button type="primary" htmlType="submit" block>
                        Сохранить все подарки
                    </Button>
                </Form.Item>
            </Form>

            {presentList!== undefined && presentList.length > 0? presentList.map((present, i) => <PresentItem present={present} key={present.id} />) : <Empty description='Что-то как-то пока нет идей видимо'/>}

        </Flex>
    );
};