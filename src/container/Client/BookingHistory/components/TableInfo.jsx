import React, { Component } from 'react';
import { Table, Input, Button, Space, Dropdown, DownOutlined, Badge } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

class TableInfo extends Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              this.handleReset(clearFilters)
              confirm({ closeDropdown: false });
              this.setState({
                searchText: '',
                searchedColumn: dataIndex,
              });
            }}
            size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#001232' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    //this.setState({ searchText: '' });
  };

  render() {
    const expandedRowRender = (data) => {
      const columns = [
        { title: 'Theater code', dataIndex: 'theaterCode', key: 'theaterCode' },
        { title: 'Theater name', dataIndex: 'theater', key: 'theater' },
        { title: 'Room', dataIndex: 'room', key: 'room' },
        { title: 'Seat code', dataIndex: 'seatCode', key: 'seatCode' },
        { title: 'Seat name', dataIndex: 'seat', key: 'seat' },
      ];
      return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns = [
      { title: 'Ticket code', dataIndex: 'code', key: 'code', width: '10%' },
      { title: 'Movie name', dataIndex: 'name', key: 'name', width: '50%', ...this.getColumnSearchProps('name') },
      { title: 'Price', dataIndex: 'price', key: 'price', width: '15%' },
      {
        title: 'Booked date',
        dataIndex: 'date',
        key: 'date',
        ...this.getColumnSearchProps('date'),
        sorter: function (a, b) {
          let aa = a.date.split('/').reverse().join(), bb = b.date.split('/').reverse().join();
          return aa < bb ? -1 : (aa > bb ? 1 : 0);
        },
        sortDirections: ['descend', 'ascend'],
      },
    ];
    return <Table columns={columns} bordered dataSource={this.props.bookingInfo} expandable={{ expandedRowRender: record => expandedRowRender(record.arr)}} pagination={{ defaultPageSize: 5}} />;
  }
}

export default TableInfo;