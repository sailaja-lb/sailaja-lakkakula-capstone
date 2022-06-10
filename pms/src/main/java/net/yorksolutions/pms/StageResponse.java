package net.yorksolutions.pms;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Column;
import java.util.UUID;

public class StageResponse {

    private UUID token;

    private String prompt;

    @JsonProperty("res_type")
    private String resType;

    private String choices;

    private String answer;

    @JsonProperty("stage_order")
    private Integer order;

    public UUID getToken() {
        return token;
    }

    public void setToken(UUID token) {
        this.token = token;
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
}
