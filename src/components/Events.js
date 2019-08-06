import React from 'react';
import MaterialTable from 'material-table';
import moment from 'moment';
import { forwardRef } from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from 'react-i18next';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class Events extends React.Component {

    generateRandomData = () => {
        let array = [];
        for (let i = 0; i < 100; i++) {
            array.push({ event: 'Załączenie', device: `Q${i}`, time: moment().subtract(i, 'minutes').toISOString() })
        }
        return array
    }

    render() {
        const { t } = this.props;
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant='h3' gutterBottom>
                        {t('events')}
                        </Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <MaterialTable
                        icons={tableIcons}
                        columns={[
                            { title: t('event'), field: 'event' },
                            { title: t('eventsDevice'), field: 'device'},
                            { title: t('eventsTime'), field: 'time', type: 'datetime', defaultSort:'desc' }
                        ]}
                        data={this.generateRandomData()}
                        title='Demo Title'
                        options={{
                            pageSize: 10,
                            showTitle: false,
                            searchFieldAlignment: 'right'
                        }}
                        localization={{
                            pagination: {
                                labelDisplayedRows: `{from}-{to} ${t('eventsFrom')} {count}`,
                                labelRowsSelect: t('eventsRows'),
                                previousAriaLabel: t('eventsPreviousPage'),
                                previousTooltip: t('eventsPreviousPage'),
                                nextAriaLabel: t('eventsNextPage'),
                                nextTooltip: t('eventsNextPage'),
                                firstTooltip: t('eventsFirstPage'),
                                lastTooltip: t('eventsLastPage')
                            },
                            toolbar: {
                                searchTooltip: t('eventsSearch'),
                                searchPlaceholder: t('eventsSearch')
                            },
                            body: {
                                emptyDataSourceMessage: t('eventsNoData'),
                            }
                        }}
                    />
                </Grid>
            </Grid>
        )
    }
}

export default withTranslation()(Events);