import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getEmailInfo } from "../../Actions/EmailInfoAction";
import { Spin,  } from 'antd';
import "../../CSS/EmailInfo.css";

class EmailInfo extends PureComponent {
    
    componentDidMount(){

        const {id,folder} = this.props.location.state
        
        if(id && folder){
            this.props.getEmailInfo(id,folder)
        }
    }

    render() {

        const {loading,info} = this.props

        console.log(info)

        if(info)
        {
            var {subject,textContent,sentDate,attachments} = info

            var attachmentsViews = []

            attachments.map((value,index)=>{

                var {fileName,size} = value

                attachmentsViews.push(<div key={`${index}`}><a href='http://192.168.1.28:8080/innovate-api/v1/mail/getAttachments?account=A012D78B-3387-4737-BB71-8599D13AF7BA&folder=INBOX&msgID=55&index=1' download="fileName">{`${fileName}-(${size}KB)`}</a><br/></div>)
            })
        }

        return (
            <div>
                <div className='EmailInfo_Spin'>
                    <Spin spinning={loading}></Spin>
                </div>
                <h3>{`主题：${subject}`}</h3>
                <p>{`日期：${sentDate}`}</p>
                {attachments && attachments.length == 0 ? (<div></div>) : (<div>{`附件:`}{attachmentsViews}</div>)}
                <p  className='EmailInfo_Content' dangerouslySetInnerHTML={{ __html: textContent }}  />
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        loading:state.Email.loading,
        info:state.Email.info,
    }
  }

const mapDispatchToProps = (dispatch)=>{
    return {
        getEmailInfo:(id,folder)=>{
            dispatch(getEmailInfo(id,folder))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EmailInfo);