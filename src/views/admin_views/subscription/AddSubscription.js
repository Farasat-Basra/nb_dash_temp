// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import {
  Card,
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  ModalHeader,
  FormFeedback
} from 'reactstrap'

// ** Third Party Components
import Select from 'react-select'
import { User, Check, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
]

const countryOptions = [
  { value: 'uk', label: 'UK' },
  { value: 'usa', label: 'USA' },
  { value: 'france', label: 'France' },
  { value: 'russia', label: 'Russia' },
  { value: 'canada', label: 'Canada' }
]

const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'dutch', label: 'Dutch' }
]

const defaultValues = {
  firstName: 'Bob',
  lastName: 'Barton',
  username: 'bob.dev'
}

const AddSubscription = () => {
  // ** States
  const [show, setShow] = useState(false)
  console.log("🚀 ~ AddSubscription ~ show:", show)

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      return null
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  return (
    <Fragment>
          <Button color='primary' onClick={() => setShow(true)}>
          Add Subscription
          </Button>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Add New Subscription</h1>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col md={6} xs={12}>
              <Label className='form-label' for='amount'>
                Amount
              </Label>
              <Controller
                control={control}
                name='amount'
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id='amount'
                      placeholder='John'
                      value={field.value}
                      invalid={errors.amount && true}
                    />
                  )
                }}
              />
              {errors.amount && <FormFeedback>Please enter a valid First Name</FormFeedback>}
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' for='lastName'>
                Last Name
              </Label>
              <Controller
                name='lastName'
                control={control}
                render={({ field }) => (
                  <Input {...field} id='lastName' placeholder='Doe' invalid={errors.lastName && true} />
                )}
              />
              {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' for='status'>
                Status:
              </Label>
              <Select
                id='status'
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={statusOptions}
                theme={selectThemeColors}
                defaultValue={statusOptions[0]}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' for='email'>
                Expiry Date
              </Label>
              <Input type='email' id='email' placeholder='example@domain.com' />
            </Col>
            <Col xs={12} className='text-center mt-2 pt-50'>
              <Button type='submit' className='me-1' color='primary' onClick={() => setShow(false)  } >
                Submit
              </Button>
              <Button type='reset' color='secondary' outline onClick={() => setShow(false)}>
                Discard
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default AddSubscription
