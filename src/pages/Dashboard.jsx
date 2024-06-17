import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BarGraph from "../components/BarGrpah";
import GraphActions from "../store/actions/graph-actions";
import NewMultiSelects from "../components/NewMultiSelect";
import DountChart from "../components/DountChart";


const Dashboard = () => {
    const [type, settype] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    let dispatch = useDispatch();
    const [ data ,setData] = useState([])

    let pieGraphData = useSelector((state) => {
        return state?.GraphData?.getGraphProjectStatus || [""]
    });

    

    


    console.table(pieGraphData)





    useEffect(() => {
        dispatch(GraphActions.getGraphProjectStatus());
    }, []);

    return (
        <div className='border p-4 rounded-md grid gap-4 md:grid-cols-2 bg-[#252525]'>
       
            <div className="bg-[#1c1c1c] p-4">
              
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="flex flex-col flex-1">
                            {/* <label className = "text-white">Project Group</label>
                            <select>
                                <option>hi</option>
                                <option>hello</option>
                            </select> */}
                            <NewMultiSelects label='Project Group' option={[
                                {
                                    label : 'smsn',
                                    value : '1'
                                },
                                {
                                    label : 'smsfgdn',
                                    value : '12'
                                },
                                {
                                    label : 'smdfgsn',
                                    value : '123'
                                },
                                {
                                    label : 'smsneee',
                                    value : '10'
                                },
                                {
                                    label : 'sms333333fgdn',
                                    value : '124'
                                },
                                {
                                    label : 'smdf3333gsn',
                                    value : '12355'
                                },
                            ]} value={selectedOptions} cb={( data ) => setSelectedOptions(data)} />
                        </div>
                        <div className="flex flex-col flex-1">
                        <NewMultiSelects label='Project Type' option={[
                                {
                                    label : 'smsn',
                                    value : '1'
                                },
                                {
                                    label : 'smsfgdn',
                                    value : '12'
                                },
                                {
                                    label : 'smdfgsn',
                                    value : '123'
                                },
                                {
                                    label : 'smsneee',
                                    value : '10'
                                },
                                {
                                    label : 'sms333333fgdn',
                                    value : '124'
                                },
                                {
                                    label : 'smdf3333gsn',
                                    value : '12355'
                                },
                            ]} value={selectedOptions} cb={( data ) => setSelectedOptions(data)} />
                        </div>
                        <div className="flex flex-col flex-1">
                        <NewMultiSelects label='Project Manager' option={[
                                {
                                    label : 'Vishal',
                                    value : 'yadav'
                                },
                                
                            ]} value={selectedOptions} cb={( data ) => setSelectedOptions(data)} />
                        </div>

                    </div>

                <DountChart data={pieGraphData} />

            </div>
            <div className="bg-[#1c1c1c] p-4">
                <h6>Project Group</h6>
                <select>
                    <option>hi</option>
                    <option>hello</option>
                </select>

                <DountChart data={pieGraphData} />

            </div>
            <div className="bg-[#1c1c1c] p-4">
                <h6>Project Group</h6>
                <select>
                    <option>hi</option>
                    <option>hello</option>
                </select>

                <DountChart data={pieGraphData} />

            </div>
            <div className="bg-[#1c1c1c] p-4">
                <h6>Project Group</h6>
                <select>
                    <option>hi</option>
                    <option>hello</option>
                </select>

                <DountChart data={pieGraphData} />

            </div>
            <div className="bg-[#1c1c1c] p-4">
                <h6>Project Group</h6>
                <select>
                    <option>hi</option>
                    <option>hello</option>
                </select>

                <DountChart data={pieGraphData} />

            </div>
            <div className="bg-[#1c1c1c] p-4">
                <h6>Project Group</h6>
                <select>
                    <option>hi</option>
                    <option>hello</option>
                </select>

                <DountChart data={pieGraphData} />

            </div>
            <div className="bg-[#1c1c1c] p-4">
                <h6>Project Group</h6>
                <select>
                    <option>hi</option>
                    <option>hello</option>
                </select>

                <DountChart data={pieGraphData} />

            </div>

            {/* <BarGraph data={""} /> */}
        </div>

    );
};
export default Dashboard;

