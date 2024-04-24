import React, { useState } from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import AddComponent from '../../components/customer/add';
import SelectComponent from '../../components/customer/select';
import CompileComponent from '../../components/customer/compile';
import DeleteComponent from '../../components/customer/delete';
import AddVehicle from '../../components/vehicle/add'
import SelectVehicleComponent from '../../components/vehicle/select'
import VehicleCompile from '../../components/vehicle/compile';
import VehicleDeleteComponent from '../../components/vehicle/delete'
import OutboundComponent from '../../components/outbound/add'
import SearchOutBoundSelect from '../../components/outbound/select'
import DeleteOutBound from '../../components/outbound/delete';
import CompileOutBound from '../../components/outbound/compile';
import AddInbound from '../../components/inbound/add'
import DeleteInbound from '../../components/inbound/delete'
import SelectInbound from '../../components/inbound/select'
import CompileInbound from '../../components/inbound/compile'

import "./index.css"


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const App = () => {
    const [renderComponent, setRenderComponent] = useState(null); // 使用状态来控制是否渲染组件

    const onClick = (e) => {
        console.log('用户点击了 ', e);
        switch (e.key) {
            case '3':
                setRenderComponent(<AddComponent />);
                break;
            case '4':
                setRenderComponent(<SelectComponent />);
                break;
            case '5':
                setRenderComponent(<CompileComponent/>)
                break;
            case '6':
                setRenderComponent(<DeleteComponent/>)
                break;
            case '7':
                setRenderComponent(<AddVehicle/>)
                break
            case '8':
                setRenderComponent(<SelectVehicleComponent/>)
                break;
            case '9':
                setRenderComponent(<VehicleCompile/>)
                break;
            case '10':
                setRenderComponent(<VehicleDeleteComponent/>)
                break
            case '11':
                setRenderComponent(<OutboundComponent/>)
                break;
            case '12':
                setRenderComponent(<SearchOutBoundSelect/>)
                break;
            case '13':
                setRenderComponent(<DeleteOutBound/>)
                break;
            case '25':
                setRenderComponent(<CompileOutBound/>)
                break;
            case '14':
                setRenderComponent(<AddInbound/>)
                break;
            case '15':
                setRenderComponent(<SelectInbound/>)
                break;
            case '16':
                setRenderComponent(<DeleteInbound/>)
                break;
            case '26':
                setRenderComponent(<CompileInbound/>)
                break;
            default:
                setRenderComponent(null);
        }

    };

    const items = [
        getItem('客户管理', 'sub1', <AppstoreOutlined />, [
            getItem('客户信息管理', '1', null, [getItem('添加', '3'), getItem('查询', '4'), getItem('编辑', '5'), getItem('删除', '6')]),
            getItem('客户车辆管理', '2', null, [getItem('添加', '7'), getItem('查询', '8'), getItem('编辑', '9'), getItem('删除', '10')]),
        ]),
        getItem('出入库管理', 'sub2', <AppstoreOutlined />, [
            getItem('出库操作', 'g1', null, [getItem('新增出库', '11'), getItem('查询出库', '12'), getItem('删除出库', '13'),getItem('编辑出库记录',25)], 'group',),
            getItem('入库操作', 'g2', null, [getItem('新增入库', '14'), getItem('查询入库', '15'), getItem('删除入库', '16'),getItem('编辑入库记录',26)], 'group'),
        ]),
        // getItem('库存管理', 'sub3', <AppstoreOutlined />, [
        //     getItem('查询库存', '17'),
        //     getItem('修改库存', '18'),
        //     getItem('删除库存', '19'),
        //     // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
        // ]),
        // getItem('维修订单', 'sub4', <AppstoreOutlined />, [
        //     getItem('下单', '20'),
        //     getItem('派工', '21'),
        //     getItem('完工', '22'),
        //     getItem('结算', '23'),
        //     getItem('查询', '24'),
        // ]),
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

    return (
        <div className='home'>
            <div className="container">
                <Menu
                    onClick={onClick}
                    style={{ width: 256 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
                <div className="addComponents">
                    {renderComponent}
                </div>
            </div>
        </div>
    );
};

export default App;
