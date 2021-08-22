import React,{ Fragment } from 'react'
import {Tabs } from 'element-react';
import 'element-theme-default';

export default function NewsMediaTab() {
    return (
        <Fragment>
            <div className="news-tab-wrapper">
                <Tabs type="border-card" activeName="1">
                    <Tabs.Pane label="All" name="1">
                        <div className="tab-body">
                            All News not published
                        </div>
                    </Tabs.Pane>
                    <Tabs.Pane label="Raj Bhavan News" name="2">
                        <div className="tab-body">
                           Not published yet
                        </div>
                    </Tabs.Pane>
                    <Tabs.Pane label="CM's News" name="3">
                        <div className="tab-body">
                            Not published yet
                        </div>
                    </Tabs.Pane>
                </Tabs>
            </div>
        </Fragment>
    )
}
