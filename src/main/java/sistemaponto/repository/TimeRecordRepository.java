package sistemaponto.repository;



import sistemaponto.model.TimeRecord;
import sistemaponto.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TimeRecordRepository extends JpaRepository<TimeRecord, Long> {
    List<TimeRecord> findByEmployeeAndTimestampBetween(Employee employee, LocalDateTime start, LocalDateTime end);
}

