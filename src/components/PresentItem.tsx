import {Button, Card, Space, Typography} from "antd";
import {Present} from "../dto/Present.ts";
import {FC} from "react";
import {DeleteOutlined} from "@ant-design/icons";
import {useAppDispatch} from "../redux/Store.ts";
import {deletePresent} from "../redux/PresentSlice.ts";

const {Text} = Typography;

interface Props {
    present: Present;
}

export const PresentItem: FC<Props> = ({present}) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {dispatch(deletePresent(present.id));};
    return (
        <Card title={present.name} extra={<Button onClick={handleDelete} type='text' icon={<DeleteOutlined />}/>}>
            <Space direction='vertical'>{present.items.map((item, i) => <Text key={i} type='secondary'>{item}</Text>)}</Space>
        </Card>
    );
};
