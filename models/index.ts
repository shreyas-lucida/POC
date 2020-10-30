// export { default as Employee } from './empolyee.model';
// export { default as EmployeeContact } from './employeeContact.model';
// export { default as EmployeePayment } from './employeePay.model';

// import Employee from './empolyee.model';
// import EmployeePayment from './employeePay.model';
// import EmployeeContact from './employeeContact.model';

// Employee.hasMany(EmployeePayment);
// Employee.hasMany(EmployeeContact, { as: 'contacts' })
// Employee.hasMany(EmployeePayment, { as: 'payments' })
// EmployeePayment.belongsTo(Employee);
/** Above are the references */

import EnvConfig from './configs.model';

export { EnvConfig }