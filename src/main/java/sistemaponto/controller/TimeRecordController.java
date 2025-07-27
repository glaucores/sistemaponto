package sistemaponto.controller;



import sistemaponto.model.Employee;
import sistemaponto.model.TimeRecord;
import sistemaponto.repository.EmployeeRepository;
import sistemaponto.repository.TimeRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/timerecords")
public class TimeRecordController {

    @Autowired
    private TimeRecordRepository timeRecordRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/{employeeId}")
    public TimeRecord registerTime(@PathVariable Long employeeId, @RequestParam String type) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow();
        TimeRecord record = new TimeRecord();
        record.setEmployee(employee);
        record.setTimestamp(LocalDateTime.now());
        record.setType(type.toUpperCase());
        return timeRecordRepository.save(record);
    }

    @GetMapping("/{employeeId}/date/{date}")
    public List<TimeRecord> getRecordsByDate(@PathVariable Long employeeId, @PathVariable String date) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow();
        LocalDate localDate = LocalDate.parse(date);
        LocalDateTime start = localDate.atStartOfDay();
        LocalDateTime end = localDate.atTime(LocalTime.MAX);
        return timeRecordRepository.findByEmployeeAndTimestampBetween(employee, start, end);
    }
}

