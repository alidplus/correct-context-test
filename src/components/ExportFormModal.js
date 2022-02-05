import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { toast } from 'react-toastify';
import { saveReport } from '../api'

const exportTypes = {
  excel: { label: 'Excel' },
  csv: { label: 'CSV' }
}

const scheduleTypes = {
  'no-repeat': { label: 'No Repeat' },
  date: { label: 'Specific Date' },
  daily: { label: 'Daily' },
  weekly: { label: 'Weekly' }
}

const useReportState = (init = {}) => {
  const [formData, setFormData] = useState({
    name: init.name || '',
    exportType: init.exportType || '',
    email: init.email || '',
    scheduleType: init.scheduleType || '',
    date: init.date || '',
    time: init.time || '',
    weekDay: init.weekDay || ''
  })
  const mutateForm = (action = {}) => {
    const { type, payload } = action
    let nextState = formData
    switch (type) {
      case 'name':
      nextState = { ...formData, name: payload };
      break;

      case 'exportType':
      nextState = { ...formData, exportType: payload };
      break;

      case 'email':
      nextState = { ...formData, email: payload };
      break;

      case 'scheduleType':
      nextState = { ...formData, scheduleType: payload };
      break;

      case 'date':
      nextState = { ...formData, date: payload };
      break;

      case 'time':
      nextState = { ...formData, time: payload };
      break;

      case 'weekDay':
      nextState = { ...formData, weekDay: payload };
      break;

      default:
        nextState = formData
    }
    setFormData(nextState)
  }
  return [formData, mutateForm]
}


export default function ExportFormModal() {
  const [show, setShow] = useState(false);
  const [formData, mutateForm] = useReportState({ exportType: 'excel', scheduleType: 'no-repeat', name: 's', email: 'a@b.co' })
  
  const handleClose = () => setShow(false)
  const submit = (e) => {
    e.preventDefault()
    saveReport(formData)
      .then(({ data }) => {
        setShow(false)
        toast.success('Your request saved')
      })
  }
  const handleChangeFactory = type => e => mutateForm({ type, payload: e.currentTarget.value })

  return (
    <>
      <Button onClick={() => setShow(true)}>Export Report</Button>
      <Modal
        size="lg"
        show={show}
        backdrop={false}
        onHide={() => setShow(false)}
        centered
      >
        <Form onSubmit={(e) => submit(e)}>
          <Modal.Header className='bg-dark bg-opacity-10'>
            <Modal.Title as="h6" className="text-dark text-opacity-75">
              Export Report
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
              <Form.Label column sm={2}>
                Report name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={formData.name}
                  onChange={handleChangeFactory('name')}
                  placeholder="Shareablee Report"
                  required
                />
              </Col>
            </Form.Group>
            <fieldset>
              <Form.Group as={Row} className="mb-3">
                <Form.Label as="legend" column sm={2}>
                  Format
                </Form.Label>
                <Col sm={9} className='d-flex align-items-center'>
                  {Object.entries(exportTypes).map(([id, { label }]) => (
                    <Form.Check
                      key={id}
                      type="radio"
                      name="exportType"
                      className="me-3"
                      id={id}
                      label={label}
                      value={id}
                      checked={formData.exportType === id}
                      onChange={handleChangeFactory('exportType')}
                    />
                  ))}
                </Col>
              </Form.Group>
            </fieldset>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                E-mail to
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={handleChangeFactory('email')}
                  placeholder="client@company.com"
                  required
                />
              </Col>
            </Form.Group>
            <fieldset>
              <Form.Group as={Row} className="mb-3">
                <Form.Label as="legend" column sm={2}>
                  Schedule
                </Form.Label>
                <Col sm={9} className='d-flex align-items-center'>
                  {Object.entries(scheduleTypes).map(([id, { label }]) => (
                    <Form.Check
                      key={id}
                      type="radio"
                      name="scheduleType"
                      className="me-3"
                      id={id}
                      label={label}
                      value={id}
                      checked={formData.scheduleType === id}
                      onChange={handleChangeFactory('scheduleType')}
                    />
                  ))}
                </Col>
              </Form.Group>
            </fieldset>
            {formData.scheduleType === 'date' ? (
              <Form.Group as={Row} className="mb-3" controlId="specific-date">
                <Form.Label column sm={2}>
                  Date
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    type="date"
                    value={formData.date}
                    onChange={handleChangeFactory('date')}
                    required
                  />
                </Col>
                <Form.Label column sm={1} className="text-center">
                  at
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    type="time"
                    value={formData.time}
                    onChange={handleChangeFactory('time')}
                    required
                  />
                </Col>
              </Form.Group>
            ) : null}
            {formData.scheduleType === 'daily' ? (
              <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                  Everyday at
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="time"
                    value={formData.time}
                    onChange={handleChangeFactory('time')}
                    required
                  />
                </Col>
              </Form.Group>
            ) : null}
            {formData.scheduleType === 'weekly' ? (
              <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                  Every
                </Form.Label>
                <Col sm={3}>
                  <Form.Select
                    value={formData.weekDay}
                    onChange={handleChangeFactory('weekDay')}
                    required
                  >
                    <option value="mon">Monday</option>
                    <option value="tue">Tuesday</option>
                    <option value="wen">Wendsday</option>
                    <option value="thu">Thursday</option>
                    <option value="fri">Friday</option>
                    <option value="sat">Saturday</option>
                    <option value="sun">Sunday</option>
                  </Form.Select>
                </Col>
                <Form.Label column sm={1} className="text-center">
                  at
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    type="time"
                    value={formData.time}
                    onChange={handleChangeFactory('time')}
                    required
                  />
                </Col>
              </Form.Group>
            ) : null}
          </Modal.Body>
          <Modal.Footer className='p-3'>
            <Button variant='outline-secondary' className='me-md-3' onClick={handleClose}>Cancel</Button>
            <Button variant='primary' type='submit'>Ok</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
