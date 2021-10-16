import { Current } from 'components/layout/breadcrumb/styles'
import React, { FC } from 'react'
import ReactDOMServer from 'react-dom/server'
import styled from 'styled-components'

interface IRolesPageSelected {
    (index: number): void;
}
interface RolesPagingProps {
    currentPage: number;
    totalPages: number;
    onPageSelected: IRolesPageSelected;
}

const SelectedIndex = styled.span`
    color: gray;
`
const AvailableIndex = styled.span`
    a {
        text-decoration: none;
    }
`

const RolesPaging: FC<RolesPagingProps> = (props) => {
    
    function RenderPagingButton(condition: boolean, ix: number | string): React.ReactNode {
        return condition 
                ? <SelectedIndex>{ix}</SelectedIndex> 
                : <AvailableIndex><a href="#" data-index={ix} onClick={onPageClick}>{ix}</a></AvailableIndex>;
    }
        
    const onPageClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
        const target = event.currentTarget;
        if (target.dataset.index) {
            const indexStr = target.dataset.index
            if (indexStr == "<<") {
                props.onPageSelected(props.currentPage - 1);
            }
            else if (indexStr == ">>") {
                props.onPageSelected(props.currentPage + 1);
            }
            else {
                const index = Number.parseInt(indexStr);
                props.onPageSelected(index);
            }
        }
    }

    const links = [];
    for (let ix = 1; ix <= props.totalPages; ix++) {
        links.push(ix)
    }
    return <div>
        {RenderPagingButton(props.currentPage == 1, "<<")} | {
        links
            .map<React.ReactNode>(ix => RenderPagingButton(ix == props.currentPage, ix))
            .reduce((prev, curr) => [prev, ' | ', curr])
        } | {RenderPagingButton(props.currentPage == props.totalPages, ">>")}
    </div>
}


export default RolesPaging

