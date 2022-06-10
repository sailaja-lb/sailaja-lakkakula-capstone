package net.yorksolutions.pms;


import javax.persistence.*;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "process")
public class Process {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "process_id")
    private Long id;

    public String title;

   public String status;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "process_id")
    public List<Stage> stages;

    public Process() {

    }

    public List<Stage> getStages() {
        return stages;
    }

    public void setStages(List<Stage> stages) {
        this.stages = stages;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Process(String title, String status, List stages) {
        this.title = title;
        this.status = status;
        this.stages = stages;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Process)) return false;
        Process that = (Process) o;
        return Objects.equals(id, that.id) && Objects.equals(title, that.title) && Objects.equals(status, that.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, status);
    }

}
