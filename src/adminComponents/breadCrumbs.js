import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'

const BreadcrumbsDefault = props => {
    const {title} = props;
  return (
    <>
      <Breadcrumb className='ms-1 mb-1'>
        <BreadcrumbItem>
          <Link to='#'> App </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to='#'> Pages </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> {title} </span>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  )
}
export default BreadcrumbsDefault