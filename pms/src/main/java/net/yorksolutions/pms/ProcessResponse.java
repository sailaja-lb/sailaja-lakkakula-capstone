package net.yorksolutions.pms;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

public class ProcessResponse {

    public UUID token;

    public String title;

    public String status;

    public List<StageResponse> stages;

    public UUID getToken() {
        return token;
    }

    public void setToken(UUID token) {
        this.token = token;
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

    public List<StageResponse> getStages() {
        return stages;
    }

    public void setStages(List<StageResponse> stages) {
        this.stages = stages;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProcessResponse that = (ProcessResponse) o;
        return Objects.equals(getToken(), that.getToken()) && Objects.equals(getTitle(), that.getTitle()) && Objects.equals(getStatus(), that.getStatus()) && Objects.equals(getStages(), that.getStages());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getToken(), getTitle(), getStatus(), getStages());
    }
}
