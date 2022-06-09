package net.yorksolutions.pms;

import org.springframework.context.annotation.Primary;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "stage")
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "stage_id")
    private Long id;

    private String prompt;

    @Column(name = "res_type")
    private String resType;

    private String choices;

    private String answer;

    @Column(name = "stage_order")
    private Integer order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getResType() {
        return resType;
    }

    public void setResType(String resType) {
        this.resType = resType;
    }

    public String getChoices() {
        return choices;
    }

    public void setChoices(String choices) {
        this.choices = choices;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Stage)) return false;
        Stage stage = (Stage) o;
        return Objects.equals(id, stage.id) && Objects.equals(prompt, stage.prompt) && Objects.equals(resType, stage.resType) && Objects.equals(choices, stage.choices) && Objects.equals(answer, stage.answer) && Objects.equals(order, stage.order);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, prompt, resType, choices, answer, order);
    }
}
