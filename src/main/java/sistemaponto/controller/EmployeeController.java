package sistemaponto.controller;



import sistemaponto.model.Employee;
import sistemaponto.repository.EmployeeRepository;

import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public List<Employee> all() {
        return employeeRepository.findAll();
    }

    @PostMapping
    public Employee create(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    @GetMapping("/{id}")
public Employee getById(@PathVariable Long id) {
    return employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Funcionário não encontrado com id: " + id));
}

@PutMapping("/{id}")
public Employee update(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
    return employeeRepository.findById(id)
            .map(employee -> {
                employee.setName(updatedEmployee.getName());
                employee.setEmail(updatedEmployee.getEmail());
                employee.setPassword(updatedEmployee.getPassword());
                return employeeRepository.save(employee);
            })
            .orElseThrow(() -> new RuntimeException("Funcionário não encontrado com id: " + id));
}

 // DELETE - Remover
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        employeeRepository.deleteById(id);
    }


}

