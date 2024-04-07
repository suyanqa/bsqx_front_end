import React from 'react';
import {AppstoreOutlined} from '@ant-design/icons';
import {Menu} from 'antd';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('客户管理', 'sub1', < AppstoreOutlined / > , [
        getItem('客户信息管理', '2',null,[getItem('添加','2'),getItem('查询','0'),getItem('编辑','3'),getItem('删除','4')]),
        getItem('客户车辆管理', '1',null,[getItem('添加','5'),getItem('查询','6'),getItem('编辑','7'),getItem('删除','8')]),
    ]),
    getItem('出入库管理', 'sub2', < AppstoreOutlined / > , [
        getItem('出库操作', 'g1', null, [getItem('新增出库', '9'), getItem('查询出库', '10'),getItem('删除出库','11')], 'group',),
        getItem('入库操作', 'g2', null, [getItem('新增入库', '12'), getItem('查询入库', '13'),getItem('删除入库','14')], 'group'),
    ]),
    getItem('库存管理', 'sub3', < AppstoreOutlined / > , [
        getItem('查询库存', '15'),
        getItem('修改库存', '16'),
        getItem('删除库存', '17'),
        // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem('维修订单','sub4',<AppstoreOutlined />,[
        getItem('下单', '18'),
        getItem('派工', '19'),
        getItem('完工', '20'),
        getItem('结算', '21'),
        getItem('查询', '21'),
    ]),
    {
        type: 'divider',
    },
    // getItem('设置', 'sub4', < AppstoreOutlined / > , [
    //     getItem('Option 9', '22'),
    //     getItem('Option 10', '23'),
    //     getItem('Option 11', '24'),
    //     getItem('Option 12', '25'),
    // ]),
    
];
const App = () => {
    const onClick = (e) => {
        console.log('click ', e);
    };
    return ( <
        Menu onClick = {
            onClick
        }
        style = {
            {
                width: 256,
            }
        }
        defaultSelectedKeys = {
            ['1']
        }
        defaultOpenKeys = {
            ['sub1']
        }
        mode = "inline"
        items = {
            items
        }
        />
    );
};

export default App;