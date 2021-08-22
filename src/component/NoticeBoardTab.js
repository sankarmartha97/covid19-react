import React,{Fragment} from 'react'
import {Tabs } from 'element-react';
import 'element-theme-default';

export default function NoticeBoardTab() {
    return (
        <Fragment>
            <div className="tab-wrapper">
                <Tabs type="border-card" activeName="1">
                    <Tabs.Pane label="Orders" name="1">
                        <div className="advisory-tab-body">
                        <div className="row advisory-row">
                        <div className="col-sm-8">
                        <i class="fas fa-chevron-right"></i>
                        <a className="nav-link active " aria-current="page" href="./image/Containment Order 13072021.pdf" target="_blank">
                        Containment Order
                        </a>
                        </div>
                        <div className="col-sm-4 text-right">
                        13.07.2021
                        </div>
                    </div>
                    <div className="row advisory-row">
                        <div className="col-sm-8">
                        <i class="fas fa-chevron-right"></i>
                        <a className="nav-link active" aria-current="page" href="./image/ORDER No.ASDMA_28_2021_148_DTD_06.07.2021.pdf" target="_blank">
                         ASDMA Order
                        </a>
                        </div>
                        <div className="col-sm-4 text-right">
                        06.07.2021
                        </div>
                    </div>
                    <div className="row advisory-row">
                    <div className="col-sm-8">
                        <i class="fas fa-chevron-right"></i>
                        <a className="nav-link active" aria-current="page" href="./image/APDMA ORDER 30.06.2021.pdf" target="_blank">
                        APDMA Order
                        </a>
                        </div>
                        <div className="col-sm-4 text-right">
                        30.06.2021
                        </div>
                    </div>
                    

                    <div className="row advisory-row">
                        <div className="col-sm-8">
                        <i class="fas fa-chevron-right"></i>
                        <a className="nav-link active" aria-current="page" href="./image/Relaxation of covid curfew.pdf" target="_blank">
                        Relaxation of covid curfew
                        </a>
                        </div>
                        <div className="col-sm-4 text-right">
                        06.06.2021
                        </div>
                    </div>
                        </div>
                    </Tabs.Pane>
                    <Tabs.Pane label="Advisories" name="2">
                        <div className="advisory-tab-body">
                                 
     
   
                        <div className="row advisory-row">
                        <div className="col-sm-8">
                        <i class="fas fa-chevron-right"></i>
                        <a className="nav-link active" aria-current="page" href="./image/MHAOrder_2962021_Advisory.pdf" target="_blank">
                        MHA Order
                        </a>
                        </div>
                        <div className="col-sm-4 text-right">
                        29.06.2021
                        </div>
                    </div>



                            </div>
                    </Tabs.Pane>
                    <Tabs.Pane label="Press Note" name="3">
                        <div className="tab-body">
                            Not published yet
                        </div>
                    </Tabs.Pane>
                </Tabs>
            </div>
        </Fragment>
    )
}
