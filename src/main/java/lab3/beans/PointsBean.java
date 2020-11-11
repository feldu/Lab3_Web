package lab3.beans;

import lab3.model.PointDao;
import lab3.model.Point;

import javax.annotation.PostConstruct;
import java.io.Serializable;
import java.util.List;

public class PointsBean implements Serializable {
    private List<Point> points;
    PointDao pointDao;


    public void addToPoints(Point point) {
        this.points.add(point);
    }

    public List<Point> getPoints() {
        points = pointDao.getAll();
        return points;
    }

    public void setPointDao(PointDao pointDao) {
        this.pointDao = pointDao;
    }

    @PostConstruct
    public void init() {
        points = pointDao.getAll();
    }
}
