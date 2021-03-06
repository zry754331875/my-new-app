import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Table, Icon, Divider } from "antd";
import { getList, rowClick } from "../../Actions/EmailListActions";
import { createAction } from "redux-actions";
import * as EmailTypes from "../../Contants/EmailTypes";
var FOLDER = "";

const columns = [
  {
    title: "发件人",
    key: Date() + "",
    render: record => {
      if (FOLDER == "Sent") {
        let receive = record.receive;

        return `${receive[0].userName}`;
      }

      return `${record.sender.userName}`;
    },
    width: "10%"
  },
  {
    title: "主题",
    dataIndex: "subject",
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
    width: "50%"
  },
  {
    title: "日期",
    dataIndex: "sentDate",
    sorter: true,
    align: "right"
  }
];

class EmailList extends PureComponent {
  componentDidMount() {
    const { folder } = this.props.match.params;

    let pagination = this.props.pagination;

    this.props.getList(folder, pagination);
  }

  getSnapshotBeforeUpdate(prevProps, _) {
    const { folder: currentFolder } = this.props.match.params;
    const { folder: preFolder } = prevProps.match.params;

    FOLDER = currentFolder;

    if (currentFolder != preFolder) {
      let pagination = this.props.pagination;

      this.props.getList(currentFolder, pagination);
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleTableChange = (pagination, filters, sorter) => {
    const { folder } = this.props.match.params;

    this.props.getList(folder, pagination);
  };

  onRowClick = record => {
    return {
      onClick: () => {
        const { folder } = this.props.match.params;

        this.props.rowClick(record, folder);
      }
    };
  };

  render() {
    const { data, pagination, loading } = this.props;

    return (
      <Table
        ref={t => (this.table = t)}
        style={this.props.style}
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={this.handleTableChange}
        onRow={this.onRowClick}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.Email.data,
    pagination: state.Email.pagination,
    loading: state.Email.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getList: (folder, pagination) => {
      dispatch(
        createAction(EmailTypes.EMAIL_LIST_FETCH_START)({ folder, pagination })
      );
    },
    rowClick: (record, folder) => {
      dispatch(createAction(EmailTypes.EMAIL_LIST_ROW_CLICK)({record,folder}));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailList);
