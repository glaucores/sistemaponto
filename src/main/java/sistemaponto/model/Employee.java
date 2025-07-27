package sistemaponto.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Employee {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String email;
    private String password; // Para simplicidade, texto plano (melhorar depois)
}
