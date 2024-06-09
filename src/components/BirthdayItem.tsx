import {Button, Card, Typography} from "antd";
import {FC} from "react";
import {
    DeleteOutlined
} from '@ant-design/icons';
import {Birthday} from "../dto/Birthday.ts";
import {useAppDispatch} from "../redux/Store.ts";
import {deleteBirthday} from "../redux/BirthdaySlice.ts";

const {Text} = Typography;

interface Props {
    birthday: Birthday
}

export const BirthdayItem: FC<Props> = ({birthday}) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {dispatch(deleteBirthday(birthday))};

    return (
        <Card title={birthday.name} extra={<Button onClick={handleDelete} type='text' icon={<DeleteOutlined />}/>} style={{ width: '100%'}}>
            <Text>{birthday.date}</Text>
        </Card>
    );
};
