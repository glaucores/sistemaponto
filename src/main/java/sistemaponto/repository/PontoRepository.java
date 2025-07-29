package sistemaponto.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import sistemaponto.model.Ponto;

public interface PontoRepository extends JpaRepository<Ponto, Long> {
}
